const { connection } = require("../../config");

const getAllUsers = async (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error getting users: " + err.message);
      res.status(500).json({ error: "Error getting users" });
      return;
    }
    res.status(200).json(results);
  });
};

const createUser = async (req, res) => {
  const {
    user_id,
    user_name,
    attendance_datetime,
    status_number,
    Device_id,
    Devicename,
    user_code,
    timestamp,
  } = req.body;
  const sql =
    "INSERT INTO users (user_id, user_name, attendance_datetime, status_number, Device_id, Devicename, user_code, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      user_id,
      user_name,
      attendance_datetime,
      status_number,
      Device_id,
      Devicename,
      user_code,
      timestamp,
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating user: " + err.message);
        res.status(500).json({ error: "Error creating user" });
        return;
      }
      res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });
    }
  );
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error getting user: " + err.message);
      res.status(500).json({ error: "Error getting user" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(result[0]);
  });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE user_id = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user: " + err.message);
      res.status(500).json({ error: "Error deleting user" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    user_name,
    attendance_datetime,
    status_number,
    Device_id,
    Devicename,
    user_code,
    timestamp,
  } = req.body;
  const sql =
    "UPDATE users SET user_name = ?, attendance_datetime = ?, status_number = ?, Device_id = ?, Devicename = ?, user_code = ?, timestamp = ? WHERE user_id = ?";
  connection.query(
    sql,
    [
      user_name,
      attendance_datetime,
      status_number,
      Device_id,
      Devicename,
      user_code,
      timestamp,
      userId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating user: " + err.message);
        res.status(500).json({ error: "Error updating user" });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
};

const getFingerPrintData = async (req, res) => {
  const requestData = req.body;
  console.log(requestData);
  // Save received data to the database
  // connection.query(
  //   "INSERT INTO your_table_name SET ?",
  //   requestData,
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error saving data to the database:", err);
  //       res.status(500).json({ error: "Error saving data to the database" });
  //     } else {
  //       console.log("Data saved to the database successfully");
  //       res
  //         .status(200)
  //         .json({ message: "Data received and saved successfully" });
  //     }
  //   }
  // );
};

const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
  getFingerPrintData,
};
module.exports = userController;
