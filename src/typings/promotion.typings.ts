import { 
    Promotion as PCPromotion,
} from "@prisma/client";

export interface Promotion extends PCPromotion {
    promotion : Promotion
}

export type PromotionDTO = Pick<Promotion, 
     'title' | 'description' | 'allowedBy' | 'currentSalary' | 'newSalary' | 'employeeId'
>; 