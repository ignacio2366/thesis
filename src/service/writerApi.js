import $ from 'jquery';

const path = 'http://localhost'


export default class WriterModule {

    static async getCategories() {
        let result = $.get(path + '/thesis/src/api/getCategories.php')
        return result
    }
}