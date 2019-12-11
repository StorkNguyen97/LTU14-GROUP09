import moment from 'moment-timezone';

export const formatDatetime = value => {
    if (!value) return '';
    return moment(value).format('DD/MM/YYYY HH:mm');
};