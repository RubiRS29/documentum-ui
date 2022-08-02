export function searchData(){

    const dataExample = [
        {
            date        : '28-07-2022',
            proposed    : 1025,
            retired     : 100,
            published   : 50,
            draft       : 70

        },
        {
            date        : '27-07-2022',
            proposed    : 1500,
            retired     : 200,
            published   : 150,
            draft       : 170

        }
    ];

    return dataExample;

}


export function searchDataForDate( date: string ){

    const dataExample = [
        {
            date        : date,
            proposed    : 1025,
            retired     : 100,
            published   : 50,
            draft       : 70

        }
    ];

    return dataExample;
}



