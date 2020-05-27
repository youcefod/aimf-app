class NavigationService {
  instance = null;

  setInstance(instance) {
    this.instance = instance;
  }

  getInstance() {
    return this.instance;
  }

  navigate(routeName: string, params: any) {
    return this.getInstance().navigate(routeName, params);
  }
}

export default new NavigationService();
