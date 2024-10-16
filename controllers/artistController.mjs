import Artist from "../models/artistModel.mjs";

export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getArtist = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const newArtist = await Artist.create(req.body);
    res.status(201).json({
      message: "Artist created successfully",
      artist: newArtist,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateArtist = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the artist by ID
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ msg: "Artist not found" });
    }

    // If there's an uploaded file, update the profile picture URL
    if (req.file && req.file.path) {
      req.body.profilePictureUrl = req.file.path; // Set the new profile picture URL
    }

    // Update the artist's details
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      {
        $set: req.body, // Update artist fields, including the profile picture
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Artist updated successfully",
      artist: updatedArtist,
    });
  } catch (error) {
    console.error("Error updating artist:", error);
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    return res.status(200).json({ msg: "Artist deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
