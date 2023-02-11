import $ from 'jquery';

const path = 'http://localhost'

export const getCategories = async () => {
    let result = $.get(path + '/thesis/src/api/getCategories.php')
    return result
}

export const getUser = async () => {
    let result = $.get(path + '/thesis/src/api/getUser.php')
    return result
}

// Set
export const addAccount = async (data) => {
    let result = await fetch(path + '/thesis/src/api/addAccount.php', {
        method: 'POST',
        body: data
    });
    return result
    // To get the response from php
    // const response = await API.addAccount(data);
    // console.log(response);
    // const result = await response.json();
}

export const editAccount = async (data) => {
    let result = await fetch(path + '/thesis/src/api/editAccount.php', {
        method: 'POST',
        body: data
    });
    return result
}

export const setInActive = async (id) => {
    let result = $.post(path + '/thesis/src/api/setInActive.php', { id: id })
    return result
}