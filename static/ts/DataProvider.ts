class DataProvider {

    private static instance : DataProvider = null;

    public static getInstance() : DataProvider {
        if(DataProvider.instance == null) {
            DataProvider.instance = new DataProvider();
        }

        return DataProvider.instance;
    }


    private constructor() {

    }

    /**
     * Get nominal credit rate for n months from now (including current month) as a number.
     * @param monthsFromNow
     */
    public getNCR(monthsFromNow: number) : number {
        // TODO:: fill with data
        return 0.1;
    }
}