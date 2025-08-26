import 'server-only';
import prisma from '../prisma';
import { formatDuration, prettyDate } from '../utils';

export async function getTotalStudyTime(userId: string) {
  const { _sum } = await prisma.studySession.aggregate({
    _sum: { totalTime: true },
    where: { userId },
  });

  const totalSeconds = _sum.totalTime ?? 0;

  return formatDuration(totalSeconds);
}

export async function getLastStudied(userId: string) {
  const session = await prisma.studySession.findFirst({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });

  return session ? prettyDate(new Date(session.updatedAt)) : 'Never';
}
