import { EarningInterface } from 'interfaces/earning';
import { ExpenditureInterface } from 'interfaces/expenditure';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  earning?: EarningInterface[];
  expenditure?: ExpenditureInterface[];
  user?: UserInterface;
  _count?: {
    earning?: number;
    expenditure?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
