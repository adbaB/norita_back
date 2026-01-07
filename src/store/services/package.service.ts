import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ExchangeRateService } from '../../exchange-rate/services/exchange-rate.service';
import { Library } from '../../library/entities/library.entity';
import { UpdateResponse } from '../../utils/responses';
import { CreatePackageDto } from '../dto/create-package.dto';
import { UpdatePackageDto } from '../dto/update-package.dto';
import { Package } from '../entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const { libraryIds, ...packageData } = createPackageDto;

    const libraries = await this.libraryRepository.findBy({
      uuid: In(libraryIds),
    });

    if (libraries.length !== libraryIds.length) {
      throw new NotFoundException('One or more libraries not found');
    }

    const pkg = this.packageRepository.create({
      ...packageData,
      libraries,
    });

    return this.packageRepository.save(pkg);
  }

  async findAll(countryCode?: string): Promise<Package[]> {
    const packages = await this.packageRepository.find({
      relations: ['libraries'],
      select: {
        libraries: {
          uuid: true,
          titleRomaji: true,
        },
      },
    });

    if (!packages) {
      throw new NotFoundException('No packages found');
    }

    const country = await this.exchangeRateService.getExchangeRate(countryCode);

    const rate = country ? country.rate : 1;

    packages.forEach((pkg) => {
      pkg.newPrice = +(pkg.price * rate).toFixed(2);
      pkg.currency = country ? country.currencyIsoCode.toUpperCase() : 'USD';
    });

    return packages;
  }

  async findOne(uuid: string): Promise<Package> {
    const pkg = await this.packageRepository.findOne({
      where: { uuid },
      relations: ['libraries'],
    });

    if (!pkg) {
      throw new NotFoundException(`Package with UUID ${uuid} not found`);
    }

    return pkg;
  }

  async update(uuid: string, updatePackageDto: UpdatePackageDto): Promise<UpdateResponse> {
    const pkg = await this.findOne(uuid);
    const { libraryIds, ...packageData } = updatePackageDto;

    if (libraryIds) {
      const libraries = await this.libraryRepository.findBy({
        uuid: In(libraryIds),
      });

      if (libraries.length !== libraryIds.length) {
        throw new NotFoundException('One or more libraries not found');
      }
      pkg.libraries = libraries;
    }

    Object.assign(pkg, packageData);

    const affected = await this.packageRepository.update(uuid, pkg);
    return {
      affected: affected.affected,
      status: affected.affected === 0 ? 204 : 200,
    };
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.packageRepository.delete(uuid);
    if (result.affected === 0) {
      throw new NotFoundException(`Package with UUID ${uuid} not found`);
    }
  }
}
