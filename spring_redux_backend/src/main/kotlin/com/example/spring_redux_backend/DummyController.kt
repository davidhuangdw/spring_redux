package com.example.spring_redux_backend

import com.example.spring_redux_backend.models.Activity
import com.example.spring_redux_backend.models.ActivityRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.repository.query.Param
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.time.ZonedDateTime


@RestController
class DummyController{
  val logger by lazy { LoggerFactory.getLogger(javaClass.name) }

    @Autowired
    private lateinit var mongo: MongoTemplate

  @Autowired private lateinit var repository: ActivityRepository


  @GetMapping("/hello")
  fun my(
      @Param("a") a: String,
      @Param("b") b: String
         ): Iterable<Activity>{

    logger.info("${a}===========${b}")
    val fr = ZonedDateTime.parse(a)
    val to = ZonedDateTime.parse(b)
    logger.info("======${fr}")
    logger.info("======${to}")

    val query = Query(Criteria.where("to").gt(fr.toInstant()))
    logger.info("======${query}")
    val activities = mongo.find(query, Activity::class.java)

    return activities
  }
}