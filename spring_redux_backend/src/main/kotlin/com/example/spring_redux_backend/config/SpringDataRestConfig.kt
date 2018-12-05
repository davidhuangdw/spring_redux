package com.example.spring_redux_backend.config

import com.example.spring_redux_backend.models.Activity
import com.example.spring_redux_backend.models.Category
import com.example.spring_redux_backend.models.Tag
import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer


@Configuration
class SpringDataRestConfig: RepositoryRestConfigurer {
  override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
    config.exposeIdsFor(Activity::class.java, Tag::class.java, Category::class.java)
  }
}