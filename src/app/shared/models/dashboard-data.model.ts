export interface DashboardData {
    [year: string]: YearData;
}

export interface YearData {
    client: string;
    fiscalPeriod: string;
    integrations: string[];
    overallHours: HoursData;
    timesheetSummary: SummaryData;
    hoursPerProject: ProjectData;
    hoursPerEmployee: EmployeeData[];
    timesheetsPerEmployee: EmployeeData[];
}

export interface HoursData {
    tracked: number;
    expected: number;
}

export interface SummaryData {
    tracked: number;
    expected: number;
}

export interface ProjectData {
    labels: string[];
    values: number[];
}

export interface EmployeeData {
    name: string;
    tracked: number;
    total: number;
}