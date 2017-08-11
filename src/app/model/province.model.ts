import { District } from './district.model';
import { Department } from './department.model';

export class Province{
    code: number;
    name: string;
    districts: Map<number,District>;
    father: Department;
}