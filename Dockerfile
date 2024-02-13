FROM docker-registry.crifnet.com/margo/dependency/hub.docker.com/cypress/included:13.2.0 AS final-tool
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["root/package.json", "./"]
COPY ["root/package-lock.json", "./"]
COPY ["root/packages/", "./packages"]
RUN --mount=type=cache,id=npm-packages-root,target=/root/.npm \
    npm ci
COPY ["root/cypress/", "./cypress"]
COPY ["root/cypress/config", "./cypress/config"]
COPY ["root/htmlReportOptions.ts", "./"]
COPY ["root/common-env.ts", "./"]
COPY ["root/cypress.config.ts", "./"]
COPY ["root/dockerPipelineRun.sh", "./"]
COPY ["root/lib/", "./lib/"]
COPY ["root/tsconfig.json", "./"]
COPY ["root/reporter-config.json", "./"]

ENTRYPOINT ["bash", "dockerPipelineRun.sh"]
