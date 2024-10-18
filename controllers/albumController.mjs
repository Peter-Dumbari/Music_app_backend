import Album from "../models/albumModel.mjs";

export const createAlbum = async (req, res) => {
  try {
    const newAlbum = await Album.create(req.body);
    res.status(201).json({
      message: "Album created successfully",
      album: newAlbum,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAlbum = async (req, res) => {
  let { id } = req.params;

  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ msg: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  let { id } = req.params;

  try {
    const album = await Album.findByIdAndUpdate(id, req.body, { new: true });
    if (!album) {
      return res.status(404).json({ msg: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  let { id } = req.params;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ msg: "Album not found" });
    }
    res.status(200).json({ msg: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
