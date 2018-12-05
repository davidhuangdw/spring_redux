package com.example.spring_redux_backend.models

import com.example.spring_redux_backend.common.GenerateUUID
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.time.Instant
import java.util.*


@Document
data class Activity(
    val from: Date,
    val to: Date,
    val category: String,
    val description: String = "",
    val tag: Set<String> = HashSet<String>(),
    @Id var id: String = GenerateUUID()
) {
}

@Repository
interface ActivityRepository: MongoRepository<Activity, String>{

  fun findByToAfterAndFromBefore(toAfter: Instant,
                                 fromBefore: Instant): Iterable<Activity>
}
