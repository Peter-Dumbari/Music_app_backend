import Video from "../models/medialModel.mjs";

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: "Video file is not uploaded",
      });
    }

    const videoUrl = req.file.path;

    const newVideo = new Video({
      title: req.body.title,
      artist: req.body.artist || null, // Artist can be optional for event videos
      album: req.body.album || null, // Optional album
      category: req.body.category,
      fileUrl: videoUrl, // Cloudinary music file URL
      mediaType: req.body.mediaType, // Should be either "audio", "music_video", or "event_video"
      releaseDate: req.body.releaseDate || Date.now(),
      description: req.body.description || "",
    });

    const saveVideo = await newVideo.save();

    return res
      .status(201)
      .json({ message: "Video uploaded successfully", video: saveVideo });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading video",
      error,
    });
  }
};

export const getVideos = async (req, res) => {
  const objectQuery = { ...req.query };

  const exclusiveField = ["name", "page", "limit", "sort"];
  exclusiveField.forEach((el) => delete objectQuery[el]);

  try {
    const video = await Video.find({ mediaType: "video" }).populate("comments");
    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({
      message: "error fetching video",
      error,
    });
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if (!video)
      return res.json(404).json({ message: `video with id ${id} not found` });

    return res
      .status(200)
      .json({ message: "Video updated successfully", video });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
