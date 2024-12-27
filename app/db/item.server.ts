import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createChecklistItem(adventureId: string, data: Prisma.ItemCreateWithoutAdventureInput){
    return prisma.item.create({
        data: {...data, adventureId},
    });
}

export async function getChecklistItem(itemId: string){
    return prisma.item.findUnique({
        where: { id: itemId },
    });
}

export async function updateChecklistItem(itemId: string, data: Prisma.ItemUpdateInput){
    return prisma.item.update({
        where: { id: itemId },
        data,
    });
}