// controllers/profileController.js
import Profile from "../models/profile.js";


export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.json(null);
    res.json(profile);
  } catch (err) {
    console.error("❌ getProfile error:", err);
    res.status(500).json({ error: "Server error in getProfile" });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, number, gender, dob, profilePic } = req.body;

    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.email = email;
      profile.number = number;
      profile.gender = gender;
      profile.dob = dob;
      profile.profilePic = profilePic;
      await profile.save();
    } else {
      profile = new Profile({
        userId: req.user.id,
        firstName,
        lastName,
        email,
        number,
        gender,
        dob,
        profilePic,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error("❌ saveProfile error:", err);
    res.status(500).json({ error: "Server error in saveProfile" });
  }
};
