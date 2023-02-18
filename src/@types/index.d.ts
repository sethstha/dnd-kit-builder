type Content = {
  id: string | number;
  name: string;
};

type Container = {
  id: string | number;
  name: string;
  contents: Content[];
};
