const api = require("../sql");
exports.getDashboard = async (req, res) => {
  try {
    const allcase = `select count(*) as counth from casedocuments where isclose = 0`;
    const query = await api(allcase);
    const inmount = `select count(*) as counth from casedocuments where isclose = 0 AND MONTH(timebar) = MONTH(CURRENT_DATE());`;
    const queryinmount = await api(inmount);
    const groupmonth = `SELECT COUNT(*)as counth, DATE_FORMAT(timebar, '%M') AS month_name
    FROM casedocuments 
    WHERE isclose = 0
    GROUP BY MONTH(timebar);`;
    const querygroupmonth = await api(groupmonth);

    const getCustomer = `SELECT count(*) as counth from clients`;
    const querygetCustomer = await api(getCustomer);

    const getExpenses = `
    SELECT 
        SUM(caseexpenses.expenses) AS total_expenses,
        expensestype.expensesType_name
    FROM 
        caseexpenses
    left JOIN 
    expensestype ON caseexpenses.expensesType = expensestype.expensesType_id
    GROUP BY 
    expensestype.expensesType_name
`;
    const querygetExpenses = await api(getExpenses);
    res.send({
      status: 200,
      query: query,
      queryinmount: queryinmount,
      querygroupmonth: querygroupmonth,
      querygetCustomer: querygetCustomer,
      querygetExpenses: querygetExpenses,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
