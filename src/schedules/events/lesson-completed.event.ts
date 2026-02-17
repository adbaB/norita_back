export class LessonCompletedEvent {
  constructor(
    public readonly userUuid: string,
    public readonly lessonUuid: string,
    public readonly nextLessonUnlockTime: Date,
  ) {}
}
