import DataLoader from 'dataloader';
import { PrismaClient, User, Profile, Post, MemberType } from '@prisma/client';

export interface DataLoaders {
  profileLoader: DataLoader<string, Profile | null>;
  postsLoader: DataLoader<string, Post[]>;
  memberTypeLoader: DataLoader<string, MemberType[]>;
  userSubscribedToLoader: DataLoader<string, User[]>;
  subscribedToUserLoader: DataLoader<string, User[]>;
}

export const createDataLoaders = (prisma: PrismaClient) => {
  return {
    profileLoader: new DataLoader(async (ids: readonly string[]) => {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: { in: Array.from(ids) },
        },
      });

      return ids.map((id) => profiles.find((profile) => profile.userId === id) || null);
    }),

    postsLoader: new DataLoader(async (ids: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: { authorId: { in: Array.from(ids) } },
      });
      return ids.map((id) => posts.filter((post) => post.authorId === id));
    }),

    memberTypeLoader: new DataLoader(async (ids: readonly string[]) => {
      const memberTypes = await prisma.memberType.findMany({
        where: {
          id: { in: Array.from(ids) },
        },
      });
      return ids.map((id) => memberTypes.filter((type) => type.id === id));
    }),

    userSubscribedToLoader: new DataLoader(async (ids: readonly string[]) => {
      const subscriptions = await prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: { in: Array.from(ids) } },
        include: { author: true },
      });
      return ids.map((id) =>
        subscriptions.filter((sub) => sub.subscriberId === id).map((sub) => sub.author),
      );
    }),

    subscribedToUserLoader: new DataLoader(async (ids: readonly string[]) => {
      const subscriptions = await prisma.subscribersOnAuthors.findMany({
        where: { authorId: { in: Array.from(ids) } },
        include: { subscriber: true },
      });
      return ids.map((id) =>
        subscriptions.filter((sub) => sub.authorId === id).map((sub) => sub.subscriber),
      );
    }),
  };
};
