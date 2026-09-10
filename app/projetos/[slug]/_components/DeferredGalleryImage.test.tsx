import { act, fireEvent, render, screen } from "@testing-library/react";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";
import { DeferredGalleryImage } from "./DeferredGalleryImage";

const image: PortfolioImage = {
  file: "jardim.jpg",
  src: "/images/portfolio/fixture/jardim.jpg",
  alt: "Jardim integrado à área de convivência",
  width: 1200,
  height: 900,
  sizes: "100vw",
};

let intersectionCallback: IntersectionObserverCallback = () => undefined;
const observe = jest.fn();
const disconnect = jest.fn();
const callbackObserver: IntersectionObserver = {
  disconnect,
  observe,
  root: null,
  rootMargin: "240px 0px",
  scrollMargin: "0px",
  takeRecords: () => [],
  thresholds: [0],
  unobserve: jest.fn(),
};

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "240px 0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  disconnect = disconnect;
  observe = observe;
  takeRecords = () => [];
  unobserve = jest.fn();
}

function intersect(target: Element) {
  const bounds = new DOMRectReadOnly();
  const entry: IntersectionObserverEntry = {
    boundingClientRect: bounds,
    intersectionRatio: 1,
    intersectionRect: bounds,
    isIntersecting: true,
    rootBounds: null,
    target,
    time: 0,
  };
  intersectionCallback([entry], callbackObserver);
}

describe("DeferredGalleryImage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: TestIntersectionObserver,
    });
  });

  afterEach(() => {
    Reflect.deleteProperty(window, "IntersectionObserver");
    jest.resetAllMocks();
  });

  it("reserva o item e só monta a imagem quando ele se aproxima do viewport", async () => {
    render(
      <ul>
        <DeferredGalleryImage
          className="projectDetailGallery__item"
          image={image}
          orientation="landscape"
          role="lead"
          sizes="80vw"
        />
      </ul>,
    );
    const item = screen.getByRole("listitem");

    expect(item).toHaveAttribute("data-load-state", "waiting");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(observe).toHaveBeenCalledWith(item);

    act(() => intersect(item));
    const galleryImage = screen.getByRole("img", { name: image.alt });
    expect(galleryImage).toHaveAttribute("loading", "lazy");
    expect(item).toHaveAttribute("data-load-state", "loading");
    expect(disconnect).toHaveBeenCalled();

    await act(async () => {
      fireEvent.load(galleryImage);
      await Promise.resolve();
    });
    expect(item).toHaveAttribute("data-load-state", "loaded");
  });
});
