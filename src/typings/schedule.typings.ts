import {
    Schedule as PCSchedule,
} from "@prisma/client";

export interface Schedule extends PCSchedule {
    schedule: Schedule
}

export type ScheduleDTO = Pick<Schedule,
    'day' | 'start' | 'end' | 'employeeId'
>;
