FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        curl \
        ca-certificates \
        sudo \
    && rm -rf /var/lib/apt/lists/*

# node:20-bookworm-slim ships a "node" user/group at uid/gid 1000; rename it
# rather than creating a new one to avoid a uid/gid collision.
RUN groupmod -n credence node \
    && usermod -l credence -d /home/credence -m -s /bin/bash node \
    && echo "credence ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Claude Code CLI
USER credence
RUN curl -fsSL https://claude.ai/install.sh | bash
ENV PATH="/home/credence/.local/bin:$PATH"

RUN git config --global user.email "dev@credence.local" && \
    git config --global user.name "Credence Dev" && \
    git config --global init.defaultBranch main

WORKDIR /workspace

# Pre-create the node_modules mount point owned by credence, so Docker
# initializes the named volume with the right ownership on first mount.
RUN mkdir -p /workspace/frontend/node_modules
