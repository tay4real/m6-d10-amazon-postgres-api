const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }
  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findById(id) {
    if (!id) {
      throw new Error("Hey you did not provided id!");
    }
    const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id, 10)}`;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("Hey you did not provided id!");
    }
    const query = `DELETE  FROM ${this.name} WHERE id=${parseInt(id, 10)}`;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndUpdate(id, fields) {
    if (!id) {
      throw new Error("Hey you did not provided id!");
    }
    const entries = Object.entries(fields); // [['name','Luis'],['lastname','Ordonez']] => name='Luis' ,

    const query = `UPDATE ${this.name} SET ${entries
      .map(([column, value]) => `${column}='${value}'`)
      .join(",")} WHERE id=${parseInt(id)};`;
    const response = await this.run(query);
    return response;
  }

  async findOne(fields, skip, limit, order) {
    // {name:'Luis',lastname:'Ordonez'} => 'name'="'Diego'" AND 'lastname'="'Banovaz'"
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const response = await this.run(query);
      return response;
    }
  }
  async findAll(fields) {
    if (!fields || fields.length === 0) {
      throw new Error("No table to query");
    } else {
      // SELECT m.name,t.name FROM modules AS m INNER JOIN tutors AS t ON t.id=m.id;

      const joinClause = `${fields
        .map((table) => `${table}`)
        .join(" INNER JOIN ")}`;

      const onClause = `${this.name}.id = ${fields.map(
        (table) => `${table}.id`
      )}`;

      const query = `SELECT * FROM ${this.name} INNER JOIN ${joinClause} ON ${onClause};`;

      const response = await this.run(query);
      return response;
    }
  }
  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("How can I create without values?");
    }
    const columns = Object.keys(fields);
    const values = Object.values(fields);
    const query = `INSERT INTO  ${this.name} (${columns.join(
      ","
    )}) VALUES (${values.map((v) => `'${v}'`).join(",")});`;
    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;
