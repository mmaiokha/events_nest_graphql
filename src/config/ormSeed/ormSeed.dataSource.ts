import { DataSource } from "typeorm";
import typeormSeedConfig from "../ormSeed/ormSeed.config";

export default new DataSource(typeormSeedConfig);