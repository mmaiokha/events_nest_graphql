import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { Field, ObjectType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

export interface IPaginationOptions {
  skip: number;
  take: number;
}

export function PaginatedResult<T>(itemType: Type<T>) {
  @ObjectType()
  class PaginationResult<T> {
    constructor(partial: Partial<PaginationResult<T>>) {
      Object.assign(this, partial);
    }

    @Field()
    totalItemsCount: number;

    @Field()
    itemsOnPage: number

    @Field(() => [itemType])
    data: T[];
  }

  return PaginationResult<T>
}


export async function paginate<T, K>(
  options: IPaginationOptions,
  cls: Type<K>,
  qb: SelectQueryBuilder<T>
): Promise<K> {
  const [data, totalItemsCount] = await qb
    .skip(options.skip)
    .take(options.take)
    .getManyAndCount();

  return new cls({
    totalItemsCount,
    itemsOnPage: data.length,
    data
  });
}