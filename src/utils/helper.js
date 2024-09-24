import moment from "moment";

export function todayDate() {
    return moment().format('dddd, MMMM D, YYYY');
}
  