import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { User } from './User'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('description')
    t.string('status')
    t.list.field('users', {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users()
      },
    })
  },
})


export const TasksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('tasks', {
      type: 'Task',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany()
      },
    });

    t.field('task', {
      type: 'Task',
      args: {
        userId: nonNull(stringArg())
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.findMany({
          where: {
            userId: args.userId
          }
        })
      },
    })
  },
})


export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTask', {
      type: 'Task',
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        userId: stringArg(),
        id: stringArg(),
        status: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            userId: args.userId,
            id: args.id,
            status: args.status,
          }
        })
      }
    });

    t.field('updateTask', {
      type: 'Task',
      args:{
        id: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
        userId: stringArg(),
        status: stringArg(),
      },
      resolve(_root,args, ctx) {
        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            title: args.title,
            description: args.description,
            userId: args.userId,
            status: args.status,
          },
        })
      }
    });
    t.field('deleteTask', {
      type: 'Task',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root,args,ctx){
        return ctx.prisma.task.delete({
          where: {id: args.id },
        });
      },
    });
  },
});