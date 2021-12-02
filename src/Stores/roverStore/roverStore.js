export function roverstore() {
  return {
    data: [],
    age: -1,
    type: -1,
    gender: -1,
    addItem(item){
      if (this.age !== -1 && this.gender !== -1 && this.type !== -1){
        this.data.push(item);
        this.seveToLocalStorage();
        this.updateCell(item);
        return this.data.length - 1;
      } else {
        alert('Выберите параметры больничного');
        return -1;
      }
    },
    addItemSilent(item){
      this.data.push(item);
      this.seveToLocalStorage();
      this.updateCell(item);
      return this.data.length - 1;
    },
    cancelAdd(index){
      let fix_table_data = this.data[index];
      fix_table_data.value = -parseInt(fix_table_data.value);
      this.updateCell(fix_table_data);
      this.data.splice(index, 1);
      this.seveToLocalStorage();
    },
    setAge(age){
      this.age = age;
    },
    setType(type){
      this.type = type;
    },
    setGender(gender){
      this.gender = gender;
    },

    table: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    temp_table: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    seveToLocalStorage(){
      window.localStorage.setItem('data', JSON.stringify(this.data));
    },
    takeFromLocalStorage(){
      let data;
      try{
        data = JSON.parse(window.localStorage.getItem('data', JSON.stringify(this.data)))
      } catch {
        this.data = [];
      }
      if (Array.isArray(data)){
        this.data = data;
      } else {
        this.data = [];
      }
    },
    updateFullTable(){
      this.table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      for (let element of this.data){
        this.updateCell(element);
      }
    },
    updateCell(item){
      let { type, age, gender, value } = item;
      type = parseInt(type);
      age = parseInt(age);
      gender = parseInt(gender);
      value = parseInt(value);
      console.log(type, gender, age, value);
      this.table[type + gender][0]++;
      this.table[type + gender][1] += value;
      this.table[type + gender][age + 2]++;
    },
    clearData(){
      window.localStorage.removeItem('data');
      this.takeFromLocalStorage();
      this.updateFullTable();
    }
  }
}
