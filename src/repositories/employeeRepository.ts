import { connection } from "../database.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findEmployeeAndCompanyById (employeeId: number, companyId: number) {
  
  const result = await connection.query(`
    
    SELECT * FROM employees WHERE id=$1 AND "companyId"=$2
  
  `, [employeeId, companyId]);

  return result.rows[0];
  
}
