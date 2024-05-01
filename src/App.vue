<template>
  <div class="wrapper">
    <header class="header bg-primary">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div>
            <a class="navbar-brand" href="#">Kalculator</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggle"
                aria-controls="navbarToggle"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggle">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <RouterLink to="/" class="nav-link">Main</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/about" class="nav-link">About</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/signup" class="nav-link">Sign up</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/signin" class="nav-link">Sign in</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main class="page">
      <RouterView />
    </main>
    <footer class="footer bg-primary">
      Bottom text
    </footer>
  </div>
</template>

