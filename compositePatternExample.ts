/*
    This pattern is a natural consequence of organising a hierarchy into a tree data structure. Typical recursive definitions of
    a tree you'd find in competitive programming or a DS&A class will work the same way, where we can treat leaves and composite nodes
    uniformly. The main difference is that in typical DS&A resources composites and leaves will be implemented identically, and leaves
    will just be treated as composites who don't happen to have any children, mostly likely implemented by null pointers or a empty child
    list. For implementing this pattern as part of a OOP project, you would only do it this way if the circumstances were right.

    I prefer using seperate interfaces for leaves and components, as it makes no conceptual sense for a leaf to have methods like addChild()
    and removeChild()
*/

{
  // An interface for composites only
  interface FileComposite {
    addChildren(children: FileComponent[]): void;
    clearChildren(): void;
  }

  // An interface for both composites and leaves
  interface FileComponent {
    getSize(): number;
  }

  // A directory file that is defined in terms of 0 to many child components
  class DirectoryComposite implements FileComponent, FileComposite {
    private readonly children: FileComponent[];

    constructor() {
      this.children = [];
    }

    public addChildren(children: FileComponent[]) {
      children.forEach(child => {
        this.children.push(child);
      });
    }

    public clearChildren() {
      this.children.length = 0;
    }

    // Get size recursively by totalling the result of getSize() on all children
    public getSize() {
      return this.children.reduce(
        (total, currentFile) => total + currentFile.getSize(),
        0
      );
    }
  }

  class FileLeaf implements FileComponent {
    private readonly size: number;

    constructor(size: number) {
      this.size = size;
    }

    public getSize() {
      return this.size;
    }
  }

  // An example of how this might be used, modelled off of a small React app
  const rootDir = new DirectoryComposite();

  const indexHTML = new FileLeaf(100);
  const styleCSS = new FileLeaf(100);

  const src = new DirectoryComposite();

  const components = new DirectoryComposite();
  const utilityTS = new FileLeaf(30);

  const appTSX = new FileLeaf(1000);
  const menuTSX = new FileLeaf(2000);
  const gameTSX = new FileLeaf(2000);

  rootDir.addChildren([indexHTML, styleCSS, src]);

  src.addChildren([components, utilityTS]);

  components.addChildren([appTSX, menuTSX, gameTSX]);
}
