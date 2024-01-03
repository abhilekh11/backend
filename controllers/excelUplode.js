const Lead = require("../models/leadModel");
const csv = require("csvtojson");

const ExcelUplode = async (req, res) => {
  try {
    var leadData = [];
    const { lead_source, status, service, assign_to_agent, country, state } =
      req.body;
    csv()
      .fromFile(req.file.path)
      .then(async (responce) => {
        for (var x = 0; x < responce.length; x++) {
          leadData.push({
            full_name: responce[x].full_name,
            email_id: responce[x].email_id,
            contact_no: responce[x].contact_no,
            alternative_no: responce[x].alternative_no,
            company_name: responce[x].company_name,
            position: responce[x].position,
            website: responce[x].website,
            lead_cost: responce[x].lead_cost,
            full_address: responce[x].full_address,
            city: responce[x].city,
            pincode: responce[x].pincode,
            description: responce[x].description,
            lead_source: lead_source,
            service: service,
            status: status,
            country: country,
            assign_to_agent: assign_to_agent,
            state: state,
          });
        }
        await Lead.insertMany(leadData);
      });
    res.send({
      status: 200,
      success: true,
      message: "Uploded Csv File Successfully",
    });
  } catch (error) {
    res.send({ status: 400, success: false, mass: "not running" });
  }
};

module.exports = {
  ExcelUplode,
};
