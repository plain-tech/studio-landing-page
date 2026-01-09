import { IUseCase } from "@/types";

const IMAGE_BASE = "https://storage.googleapis.com/plain-public/web/img";

// Use cases for the "You can do anything" section
// Each use case has before/after images for the slider comparison
export const useCases: IUseCase[] = [
  {
    title: "Change Lighting",
    description:
      "Transform the mood of any room by adjusting natural and artificial lighting conditions.",
    imageSrc: `${IMAGE_BASE}/use_case_lighting_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_lighting_2.webp`,
  },
  {
    title: "Edit & Remove Objects",
    description:
      "Experiment by removing unwanted items or editing existing furniture and decor.",
    imageSrc: `${IMAGE_BASE}/use_case_edit_remove_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_edit_remove_2.webp`,
  },
  {
    title: "Change Materials",
    description:
      "Swap flooring, wall textures, fabrics, and finishes to explore different looks.",
    imageSrc: `${IMAGE_BASE}/use_case_edit_materials_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_edit_materials_2.webp`,
  },
  {
    title: "Add Specific Objects",
    description:
      "Place specific furniture, decor, or accessories into your design with precision.",
    imageSrc: `${IMAGE_BASE}/use_case_add_objects_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_add_objects_2.webp`,
  },
  {
    title: "Improve Render Quality",
    description:
      "Enhance existing renders to client-ready, photorealistic quality.",
    imageSrc: `${IMAGE_BASE}/use_case_render_improve_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_render_improve_2.webp`,
  },
  {
    title: "Render from Draft",
    description:
      "Transform rough sketches and drafts into polished visualizations.",
    imageSrc: `${IMAGE_BASE}/use_case_render_draft_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_render_draft_2.webp`,
  },
  {
    title: "Explore Ideas",
    description:
      "Quickly iterate through different design concepts and directions.",
    imageSrc: `${IMAGE_BASE}/use_case_ideate_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_ideate_2.webp`,
  },
  {
    title: "Explore Styles",
    description:
      "Try different interior styles - modern, classic, minimalist, and more.",
    imageSrc: `${IMAGE_BASE}/use_case_explore_styles_1.webp`,
    afterImageSrc: `${IMAGE_BASE}/use_case_explore_styles_2.webp`,
  },
];

// Benefits section is commented out for now
export const benefits = [];
