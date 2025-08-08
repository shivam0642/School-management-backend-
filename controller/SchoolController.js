const {addSchool,getSchoolsSortedByDistance} = require('../model/schoolModel')

const addSchoolController = async (req,resp)=>{
    try {
        const {name,address,latitude,longitude} = req.body

        if(!name || !address || !latitude || !longitude){
            return resp.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

       const newSchoolId = await addSchool({ name, address, latitude, longitude });


        return resp.status(200).send({
            success: true,
            message: "School added successfully",
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in add School api",
            error:error.message
        })
    }
}

//GET SCHOOLS CONTROLLER
const getSchoolsController = async (req, resp) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return resp.status(400).json({
        success: false,
        message: 'Latitude and Longitude are required',
      });
    }

    const schools = await getSchoolsSortedByDistance(latitude, longitude);

    if (schools.length === 0) {
      return resp.status(404).json({
        success: false,
        message: 'No schools found',
      });
    }

    return resp.status(200).json({
      success: true,
      message: 'Schools sorted by proximity',
      schools,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: 'Error in get Schools API',
      error: error.message,
    });
  }
};

module.exports = {addSchoolController,getSchoolsController}