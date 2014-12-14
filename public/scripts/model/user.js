function User(id, email, password, name, address, phone, role, state){
  this.id = id;
  this.email = email;
  this.password = password;
  this.name = name;
  this.address = address;
  this.phone = phone;
  this.role = role || "";
  this.state = state || "active";
}
