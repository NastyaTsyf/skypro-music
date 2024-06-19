import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Компонент навигации", () => {

    it("должен отрендерить картинку с логотопом", () => {
  
      render(<Navigation />);
  
      const image = screen.getByAltText("логотип skypro-music");
  
   
  
      expect(image).toBeInTheDocument();
  
    });
  
  });