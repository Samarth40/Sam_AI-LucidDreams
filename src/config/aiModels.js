import { FiCamera, FiUser, FiImage, FiPackage, FiHome, FiPenTool, FiSun, FiMoon, FiCloud } from 'react-icons/fi'

export const models = {
  'sdxl': {
    name: "LucidDream XL",
    id: "stabilityai/stable-diffusion-xl-base-1.0",
    description: "Ultra-realistic dreamscapes with exceptional detail",
    defaultPrompt: "masterpiece, best quality, highly detailed, ultra realistic, professional photography, dreamlike atmosphere",
    defaultNegative: "cartoon, illustration, anime, drawing, painting, sketch, low quality, deformed"
  },
  'realistic': {
    name: "DreamVision Pro",
    id: "SG161222/Realistic_Vision_V5.1_noVAE",
    description: "Hyper-realistic dream photography",
    defaultPrompt: "raw photo, masterpiece, high quality, 8k uhd, dslr, cinematic lighting",
    defaultNegative: "cartoon, painting, illustration, drawing, cartoon, anime, sketch, low quality"
  },
  'openjourney': {
    name: "DreamArtist",
    id: "prompthero/openjourney",
    description: "Artistic dream interpretations",
    defaultPrompt: "masterpiece, best quality, highly detailed, trending on artstation, dreamlike quality",
    defaultNegative: "low quality, bad anatomy, bad hands, cropped, worst quality"
  }
}

export const stylePresets = {
  'dreamscape': {
    name: "Dreamscape",
    icon: FiCloud,
    prompt: "ethereal dreamscape, surreal atmosphere, floating elements, mystical lighting, otherworldly scene, dreamy color palette",
    negative: "realistic, mundane, ordinary, harsh lighting",
    recommendedModel: 'sdxl'
  },
  'portrait': {
    name: "Dream Portrait",
    icon: FiUser,
    prompt: "ethereal portrait, dreamy bokeh, soft studio lighting, mystical atmosphere, ethereal glow",
    negative: "harsh lighting, cartoon, illustration, painting, low quality",
    recommendedModel: 'realistic'
  },
  'nature': {
    name: "Lucid Nature",
    icon: FiSun,
    prompt: "mystical landscape, ethereal atmosphere, dreamy nature scene, magical lighting, surreal environment",
    negative: "urban, man-made, artificial, mundane",
    recommendedModel: 'sdxl'
  },
  'night': {
    name: "Night Dreams",
    icon: FiMoon,
    prompt: "nocturnal dreamscape, mystical night scene, ethereal moonlight, magical darkness, starlit atmosphere",
    negative: "daylight, harsh lighting, ordinary, mundane",
    recommendedModel: 'sdxl'
  },
  'product': {
    name: "Dream Product",
    icon: FiPackage,
    prompt: "surreal product photography, dreamlike studio setup, ethereal lighting, floating elements, magical atmosphere",
    negative: "realistic, mundane, ordinary lighting, low quality",
    recommendedModel: 'realistic'
  },
  'architecture': {
    name: "Dream Spaces",
    icon: FiHome,
    prompt: "surreal architecture, impossible spaces, dreamlike structures, ethereal atmosphere, floating architecture",
    negative: "realistic, ordinary buildings, mundane spaces",
    recommendedModel: 'sdxl'
  },
  'artistic': {
    name: "Dream Art",
    icon: FiPenTool,
    prompt: "surreal digital art, dreamlike masterpiece, ethereal concept art, magical atmosphere, impossible scenes",
    negative: "realistic, ordinary, mundane, simple, amateur",
    recommendedModel: 'openjourney'
  }
}
