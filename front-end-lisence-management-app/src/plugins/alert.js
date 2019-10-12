export default {
  alertData: {
    show: false,
    message: "",
    type: "error"
  },
  close() {
    Object.assign(this.alertData, { show: false, message: "" });
  },
  show(type, message) {
    Object.assign(this.alertData, { show: true, type, message });
  },
  error(msg) {
    this.close();
    this.show("error", msg);
  },
  success(msg) {
    this.show("success", msg);
  },
  warn(msg) {
    this.show("warning", msg);
  }
};
