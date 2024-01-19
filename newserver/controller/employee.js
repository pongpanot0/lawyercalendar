const api = require("../sql");
const nodemailer = require("nodemailer");
const fs = require('fs').promises;
const emailTemplatePath = './email.html';
const transporter = nodemailer.createTransport({
  host: "sgsv2.hostatom.com", // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port (e.g., 587 for TLS, 465 for SSL)
  secure: false, // Set to true if using SSL
  auth: {
    user: "lawyer", // Replace with your SMTP username
    pass: "aL46Rn15ua", // Replace with your SMTP password
  },
});

exports.createEmployees = async (req, res) => {
  try {
    const {
      employee_firstname,
      employee_lastname,
      employee_role,
      employee_phone,
      employee_email,
      employee_cardno,
    } = req.body.data;
  
    const sql = `insert into employees (employee_firstname,employee_lastname,employee_role,employee_phone,employee_email,employee_cardno) values ('${employee_firstname}','${employee_lastname}','${employee_role}','${employee_phone}'  ,'${employee_email}','${employee_cardno}')`;
    const query = await api(sql);
    const url = `https://www.lawyerdocth.com/register/${query.insertId}`
    fs.readFile(emailTemplatePath, 'utf8')
   
    .then(htmlContent => {
      // Replace placeholders in the HTML content with dynamic values
      const dynamicHtml = htmlContent
        .replace('${employee_firstname}', employee_firstname)
        .replace('${employee_lastname}', employee_lastname)
        .replace('${url}',url)
  
      // Email options
      const mailOptions = {
        from: 'no-reply@lawyerdocth.com', // Sender email address
        to: `${employee_email}`, // Recipient email address
        subject: `เรียนคุณ ${employee_firstname} ${employee_lastname}`, // Email subject
        html: dynamicHtml, // HTML-formatted body from the email template
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
      });
    })
    .catch(error => {
      console.error('Error reading email template file:', error);
    });
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getEmployees = async (req, res) => {
  try {
    const sql = `select * from employees`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
