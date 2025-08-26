import 'server-only';
import prisma from '../prisma';
import { formatDuration } from '../utils';

export async function getTotalStudyTime(userId: string) {
  const { _sum } = await prisma.studySession.aggregate({
    _sum: { totalTime: true },
    where: { userId },
  });

  const totalSeconds = _sum.totalTime ?? 0;

  return formatDuration(totalSeconds);
}
