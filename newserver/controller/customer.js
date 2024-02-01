const api = require("../sql");
exports.createCustomer = async (req, res) => {
  try {
    const {
      ClientName,
      ClientType,
      ClientHomenum,
      ClientProvince,
      Clientamphure,
      Clienttambon,
      Clientzipcode,
      ClientTax,
    } = req.body.data;
    const customerRes = req.body.data.customerRes;

    const sql = `insert into clients (ClientName,ClientType,ClientHomenum,ClientProvince,Clientamphure,Clienttambon,Clientzipcode,ClientTax) 
    values ("${ClientName}","${ClientType}","${ClientHomenum}","${ClientProvince}","${Clientamphure}","${Clienttambon}","${Clientzipcode}","${ClientTax}")`;
    const query = await api(sql);

    const insertId = query.insertId;

    customerRes.forEach(async (element) => {
      const sqlcusres = `insert into customer_responses 
      (customer_responses_firstname,customer_responses_lastname,customer_responses_email,customer_responses_phone,customer_id)
      values ('${element.firstname}','${element.lastname}','${element.email}','${element.phone}','${insertId}')
      `;
      const querycusres = await api(sqlcusres);
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
exports.getCustomer = async (req, res) => {
  try {
    const sql = `select  a.*,b.*, 
    (SELECT count(*) FROM cases c WHERE c.ClientID = a.ClientID) AS TotalValue   ,
    (SELECT count(*) FROM customer_responses cr WHERE cr.customer_id = a.ClientID) as crtotalValue
    
    from clients a left join customertypes b on 
    (a.ClientType = b.customertypes_id) `;
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
exports.getCustomerresponses = async (req, res) => {
  try {
    const data = req.body.data;
    const sql = `select * from customer_responses`;
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
