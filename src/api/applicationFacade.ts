import axios, { AxiosInstance } from "axios";
import { userModule } from "@/store/modules/user";
import {
    AccountClient,
    FilesClient,
    MaterialGroupsClient,
    MaterialsClient,
    ContentPostsClient,
    ProjectsClient,
    ProjectTypesClient,
    CategoriesClient,
    ContentTagsClient,
    ContentCategoriesClient,
    ArchitectsClient,
    BundlesClient,
    OptionsClient,
    OptionGroupsClient,
    CitiesClient,
    RegionsClient,
    AreasClient,
    PriceListClient,
    PagesClient,
    UsersClient,
    RolesClient,
    SettingsClient,
    CollectionsClient,
    RedirectRulesClient,
    ModelClient
} from "@/api/clients";

class ApplicationFacade {
    constructor(public baseUrl: string, private axios: AxiosInstance) {
        this.account = new AccountClient(baseUrl, axios);
        this.posts = new ContentPostsClient(baseUrl, axios);
        this.tags = new ContentTagsClient(baseUrl, axios);
        this.contentCategories = new ContentCategoriesClient(baseUrl, axios);
        this.filesService = new FilesClient(baseUrl, axios);
        this.projectTypes = new ProjectTypesClient(baseUrl, axios);
        this.architects = new ArchitectsClient(baseUrl, axios);
        this.categories = new CategoriesClient(baseUrl, axios);
        this.projectsService = new ProjectsClient(baseUrl, axios);
        this.materialsService = new MaterialsClient(baseUrl, axios);
        this.materialGroupsService = new MaterialGroupsClient(baseUrl, axios);
        this.bundlesService = new BundlesClient(baseUrl, axios);
        this.optionsService = new OptionsClient(baseUrl, axios);
        this.optionGroups = new OptionGroupsClient(baseUrl, axios);
        this.cities = new CitiesClient(baseUrl, axios);
        this.regions = new RegionsClient(baseUrl, axios);
        this.areas = new AreasClient(baseUrl, axios);
        this.priceService = new PriceListClient(baseUrl, axios);
        this.pages = new PagesClient(baseUrl, axios);
        this.users = new UsersClient(baseUrl, axios);
        this.roles = new RolesClient(baseUrl, axios);
        this.settings = new SettingsClient(baseUrl, axios);
        this.collections = new CollectionsClient(baseUrl, axios);
        this.redirectRules = new RedirectRulesClient(baseUrl, axios);
        this.model = new ModelClient(baseUrl, axios);
    }

    account: AccountClient;
    posts: ContentPostsClient;
    tags: ContentTagsClient;
    contentCategories: ContentCategoriesClient;
    filesService: FilesClient;
    projectTypes: ProjectTypesClient;
    architects: ArchitectsClient;
    categories: CategoriesClient;
    projectsService: ProjectsClient;
    materialsService: MaterialsClient;
    materialGroupsService: MaterialGroupsClient;
    bundlesService: BundlesClient;
    optionsService: OptionsClient;
    optionGroups: OptionGroupsClient;
    cities: CitiesClient;
    regions: RegionsClient;
    areas: AreasClient;
    priceService: PriceListClient;
    pages: PagesClient;
    users: UsersClient;
    roles: RolesClient;
    settings: SettingsClient;
    collections: CollectionsClient;
    redirectRules: RedirectRulesClient;
    model: ModelClient;
}

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

instance.interceptors.request.use(
    function(config) {
        const token = userModule.token;

        if (token) {
            config.headers.common["Authorization"] = "Bearer " + token;
            config.headers.common["Access-Control-Allow-Origin"] = "*";
        } else {
            config.headers.common["Content-Type"] =
                "application/x-www-form-urlencoded";
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        console.log(error.config);
        return Promise.reject(error);
    }
);

export default new ApplicationFacade(process.env.VUE_APP_API_URL, instance);
