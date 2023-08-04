import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export interface IPaginationOptions {
  skip: number;
  take: number;
}

export interface IPaginationResult<T> {
  totalItemsCount: number;
  itemsOnPage: number
  data: T[];
}

export async function paginate<T>(
  options: IPaginationOptions,
  qb: SelectQueryBuilder<T>
): Promise<IPaginationResult<T>> {
  const [data, totalItemsCount] = await qb
    .skip(options.skip)
    .take(options.take)
    .getManyAndCount();

  return {
    totalItemsCount,
    itemsOnPage: data.length,
    data
  };
}