export interface Employee {
  id?: number;
  name: string;
  email: string;
  username: string;
  managerID: number;
  departmentID: number;
}

export interface Department {
  departmentID?: number;
  managerID: number;
  description: string;
}
