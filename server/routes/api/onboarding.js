const router = require("express").Router();
const { User } = require("../../db/models");

const STEPS = [
  [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
    },
  ],
  [
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "receiveNotifications",
      label:
        "I would like to receive email notifications for new messages when I'm logged out",
      type: "yes-no",
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "I would like to receive updates about the product via email",
      type: "yes-no",
      required: true,
    },
  ],
];

const methodNotAllowed = (req, res, next) => {
  return res.header("Allow", ["GET", "POST"]).sendStatus(405);
};

const getOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ steps: STEPS });
  } catch (error) {
    next(error);
  }
};

const isFieldMalformed = (userData) => {
  return userData
    .map(
      (data) =>
        data.hasOwnProperty("name") &&
        data.hasOwnProperty("value") &&
        Object.keys(data).length == 2
    )
    .some((e) => e === false);
};

const isFieldNotExpected = (userData) => {
  var s = STEPS.flat().map((e) => e.name);
  return userData
    .map((data) => s.includes(data.name))
    .some((e) => e === false);
};

const convertDataType = (dataType) => {
  switch (dataType) {
    case "yes-no":
      return "boolean";
    case "text":
      return "string";
    case "multiline-text":
      return "string";
    default:
      return "string";
  }
};

const isFieldValueIncorrect = (userData) => {
  return userData
    .map(
      (data) =>
        typeof data.value ===
        convertDataType(STEPS.flat().find((e) => e.name == data.name).type)
    )
    .some((e) => e === false);
};

const isRequiredFieldMissing = (userData) => {
  var requiredFields = STEPS.flat()
    .map((e) => e.name);
  return requiredFields
    .map((reqField) => userData.filter((e) => e.name === reqField).length == 1)
    .some((e) => e === false);
};

const userOnboarding = async (req, res, next) => {
  const r = req.body;
  // if (req.user.completedOnboarding === true) {
  //   return res.status(403).json({ error: "Onboarding already completed" });
  // }
  if (!r.steps)
    return res
      .status(400)
      .json({ error: "The request body doesn't have steps" });
  const userData = r.steps.flat();
  if (isFieldMalformed(userData))
    return res.status(400).json({
      error: "A field in the request body doesn't have a name or a value",
    });
  if (isFieldNotExpected(userData))
    return res.status(400).json({
      error:
        "A field in the request body is not present in the onboarding form returned from the API ",
    });
  if (isFieldValueIncorrect(userData))
    return res.status(400).json({
      error: "A field value in the request body has an incorrect data type",
    });
  if (isRequiredFieldMissing(userData))
    return res.status(400).json({
      error: "A required field is missing in the request body",
    });
  try {
    req.user.set(
      userData.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {})
    );
    req.user.completedOnboarding = true;
    await req.user.save();
    res.status(200).json({ ...req.user.dataValues });
  } catch (error) {
    next(error);
  }
};

router.route("/").get(getOnboarding).post(userOnboarding).all(methodNotAllowed);

module.exports = router;
