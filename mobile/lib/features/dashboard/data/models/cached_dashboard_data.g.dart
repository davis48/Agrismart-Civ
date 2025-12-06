// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cached_dashboard_data.dart';

// **************************************************************************
// _IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, invalid_use_of_protected_member, lines_longer_than_80_chars, constant_identifier_names, avoid_js_rounded_ints, no_leading_underscores_for_local_identifiers, require_trailing_commas, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_in_if_null_operators, library_private_types_in_public_api, prefer_const_constructors
// ignore_for_file: type=lint

extension GetCachedDashboardDataCollection on Isar {
  IsarCollection<int, CachedDashboardData> get cachedDashboardDatas =>
      this.collection();
}

const CachedDashboardDataSchema = IsarGeneratedSchema(
  schema: IsarSchema(
    name: 'CachedDashboardData',
    idName: 'id',
    embedded: false,
    properties: [
      IsarPropertySchema(
        name: 'key',
        type: IsarType.string,
      ),
      IsarPropertySchema(
        name: 'json',
        type: IsarType.string,
      ),
      IsarPropertySchema(
        name: 'lastUpdated',
        type: IsarType.dateTime,
      ),
    ],
    indexes: [
      IsarIndexSchema(
        name: 'key',
        properties: [
          "key",
        ],
        unique: true,
        hash: false,
      ),
    ],
  ),
  converter: IsarObjectConverter<int, CachedDashboardData>(
    serialize: serializeCachedDashboardData,
    deserialize: deserializeCachedDashboardData,
    deserializeProperty: deserializeCachedDashboardDataProp,
  ),
  embeddedSchemas: [],
);

@isarProtected
int serializeCachedDashboardData(
    IsarWriter writer, CachedDashboardData object) {
  {
    final value = object.key;
    if (value == null) {
      IsarCore.writeNull(writer, 1);
    } else {
      IsarCore.writeString(writer, 1, value);
    }
  }
  {
    final value = object.json;
    if (value == null) {
      IsarCore.writeNull(writer, 2);
    } else {
      IsarCore.writeString(writer, 2, value);
    }
  }
  IsarCore.writeLong(
      writer,
      3,
      object.lastUpdated?.toUtc().microsecondsSinceEpoch ??
          -9223372036854775808);
  return object.id;
}

@isarProtected
CachedDashboardData deserializeCachedDashboardData(IsarReader reader) {
  final object = CachedDashboardData();
  object.id = IsarCore.readId(reader);
  object.key = IsarCore.readString(reader, 1);
  object.json = IsarCore.readString(reader, 2);
  {
    final value = IsarCore.readLong(reader, 3);
    if (value == -9223372036854775808) {
      object.lastUpdated = null;
    } else {
      object.lastUpdated =
          DateTime.fromMicrosecondsSinceEpoch(value, isUtc: true).toLocal();
    }
  }
  return object;
}

@isarProtected
dynamic deserializeCachedDashboardDataProp(IsarReader reader, int property) {
  switch (property) {
    case 0:
      return IsarCore.readId(reader);
    case 1:
      return IsarCore.readString(reader, 1);
    case 2:
      return IsarCore.readString(reader, 2);
    case 3:
      {
        final value = IsarCore.readLong(reader, 3);
        if (value == -9223372036854775808) {
          return null;
        } else {
          return DateTime.fromMicrosecondsSinceEpoch(value, isUtc: true)
              .toLocal();
        }
      }
    default:
      throw ArgumentError('Unknown property: $property');
  }
}

sealed class _CachedDashboardDataUpdate {
  bool call({
    required int id,
    String? key,
    String? json,
    DateTime? lastUpdated,
  });
}

class _CachedDashboardDataUpdateImpl implements _CachedDashboardDataUpdate {
  const _CachedDashboardDataUpdateImpl(this.collection);

  final IsarCollection<int, CachedDashboardData> collection;

  @override
  bool call({
    required int id,
    Object? key = ignore,
    Object? json = ignore,
    Object? lastUpdated = ignore,
  }) {
    return collection.updateProperties([
          id
        ], {
          if (key != ignore) 1: key as String?,
          if (json != ignore) 2: json as String?,
          if (lastUpdated != ignore) 3: lastUpdated as DateTime?,
        }) >
        0;
  }
}

sealed class _CachedDashboardDataUpdateAll {
  int call({
    required List<int> id,
    String? key,
    String? json,
    DateTime? lastUpdated,
  });
}

class _CachedDashboardDataUpdateAllImpl
    implements _CachedDashboardDataUpdateAll {
  const _CachedDashboardDataUpdateAllImpl(this.collection);

  final IsarCollection<int, CachedDashboardData> collection;

  @override
  int call({
    required List<int> id,
    Object? key = ignore,
    Object? json = ignore,
    Object? lastUpdated = ignore,
  }) {
    return collection.updateProperties(id, {
      if (key != ignore) 1: key as String?,
      if (json != ignore) 2: json as String?,
      if (lastUpdated != ignore) 3: lastUpdated as DateTime?,
    });
  }
}

extension CachedDashboardDataUpdate
    on IsarCollection<int, CachedDashboardData> {
  _CachedDashboardDataUpdate get update => _CachedDashboardDataUpdateImpl(this);

  _CachedDashboardDataUpdateAll get updateAll =>
      _CachedDashboardDataUpdateAllImpl(this);
}

sealed class _CachedDashboardDataQueryUpdate {
  int call({
    String? key,
    String? json,
    DateTime? lastUpdated,
  });
}

class _CachedDashboardDataQueryUpdateImpl
    implements _CachedDashboardDataQueryUpdate {
  const _CachedDashboardDataQueryUpdateImpl(this.query, {this.limit});

  final IsarQuery<CachedDashboardData> query;
  final int? limit;

  @override
  int call({
    Object? key = ignore,
    Object? json = ignore,
    Object? lastUpdated = ignore,
  }) {
    return query.updateProperties(limit: limit, {
      if (key != ignore) 1: key as String?,
      if (json != ignore) 2: json as String?,
      if (lastUpdated != ignore) 3: lastUpdated as DateTime?,
    });
  }
}

extension CachedDashboardDataQueryUpdate on IsarQuery<CachedDashboardData> {
  _CachedDashboardDataQueryUpdate get updateFirst =>
      _CachedDashboardDataQueryUpdateImpl(this, limit: 1);

  _CachedDashboardDataQueryUpdate get updateAll =>
      _CachedDashboardDataQueryUpdateImpl(this);
}

class _CachedDashboardDataQueryBuilderUpdateImpl
    implements _CachedDashboardDataQueryUpdate {
  const _CachedDashboardDataQueryBuilderUpdateImpl(this.query, {this.limit});

  final QueryBuilder<CachedDashboardData, CachedDashboardData, QOperations>
      query;
  final int? limit;

  @override
  int call({
    Object? key = ignore,
    Object? json = ignore,
    Object? lastUpdated = ignore,
  }) {
    final q = query.build();
    try {
      return q.updateProperties(limit: limit, {
        if (key != ignore) 1: key as String?,
        if (json != ignore) 2: json as String?,
        if (lastUpdated != ignore) 3: lastUpdated as DateTime?,
      });
    } finally {
      q.close();
    }
  }
}

extension CachedDashboardDataQueryBuilderUpdate
    on QueryBuilder<CachedDashboardData, CachedDashboardData, QOperations> {
  _CachedDashboardDataQueryUpdate get updateFirst =>
      _CachedDashboardDataQueryBuilderUpdateImpl(this, limit: 1);

  _CachedDashboardDataQueryUpdate get updateAll =>
      _CachedDashboardDataQueryBuilderUpdateImpl(this);
}

extension CachedDashboardDataQueryFilter on QueryBuilder<CachedDashboardData,
    CachedDashboardData, QFilterCondition> {
  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idEqualTo(
    int value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EqualCondition(
          property: 0,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idGreaterThan(
    int value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterCondition(
          property: 0,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idGreaterThanOrEqualTo(
    int value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterOrEqualCondition(
          property: 0,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idLessThan(
    int value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessCondition(
          property: 0,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idLessThanOrEqualTo(
    int value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessOrEqualCondition(
          property: 0,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      idBetween(
    int lower,
    int upper,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        BetweenCondition(
          property: 0,
          lower: lower,
          upper: upper,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const IsNullCondition(property: 1));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyIsNotNull() {
    return QueryBuilder.apply(not(), (query) {
      return query.addFilterCondition(const IsNullCondition(property: 1));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EqualCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyGreaterThan(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyGreaterThanOrEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterOrEqualCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyLessThan(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyLessThanOrEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessOrEqualCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyBetween(
    String? lower,
    String? upper, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        BetweenCondition(
          property: 1,
          lower: lower,
          upper: upper,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        StartsWithCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EndsWithCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        ContainsCondition(
          property: 1,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        MatchesCondition(
          property: 1,
          wildcard: pattern,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        const EqualCondition(
          property: 1,
          value: '',
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      keyIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        const GreaterCondition(
          property: 1,
          value: '',
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const IsNullCondition(property: 2));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonIsNotNull() {
    return QueryBuilder.apply(not(), (query) {
      return query.addFilterCondition(const IsNullCondition(property: 2));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EqualCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonGreaterThan(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonGreaterThanOrEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterOrEqualCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonLessThan(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonLessThanOrEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessOrEqualCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonBetween(
    String? lower,
    String? upper, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        BetweenCondition(
          property: 2,
          lower: lower,
          upper: upper,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        StartsWithCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EndsWithCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        ContainsCondition(
          property: 2,
          value: value,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        MatchesCondition(
          property: 2,
          wildcard: pattern,
          caseSensitive: caseSensitive,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        const EqualCondition(
          property: 2,
          value: '',
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      jsonIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        const GreaterCondition(
          property: 2,
          value: '',
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const IsNullCondition(property: 3));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedIsNotNull() {
    return QueryBuilder.apply(not(), (query) {
      return query.addFilterCondition(const IsNullCondition(property: 3));
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedEqualTo(
    DateTime? value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        EqualCondition(
          property: 3,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedGreaterThan(
    DateTime? value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterCondition(
          property: 3,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedGreaterThanOrEqualTo(
    DateTime? value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        GreaterOrEqualCondition(
          property: 3,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedLessThan(
    DateTime? value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessCondition(
          property: 3,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedLessThanOrEqualTo(
    DateTime? value,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        LessOrEqualCondition(
          property: 3,
          value: value,
        ),
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterFilterCondition>
      lastUpdatedBetween(
    DateTime? lower,
    DateTime? upper,
  ) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(
        BetweenCondition(
          property: 3,
          lower: lower,
          upper: upper,
        ),
      );
    });
  }
}

extension CachedDashboardDataQueryObject on QueryBuilder<CachedDashboardData,
    CachedDashboardData, QFilterCondition> {}

extension CachedDashboardDataQuerySortBy
    on QueryBuilder<CachedDashboardData, CachedDashboardData, QSortBy> {
  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortById() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(0);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(0, sort: Sort.desc);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByKey({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(
        1,
        caseSensitive: caseSensitive,
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByKeyDesc({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(
        1,
        sort: Sort.desc,
        caseSensitive: caseSensitive,
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByJson({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(
        2,
        caseSensitive: caseSensitive,
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByJsonDesc({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(
        2,
        sort: Sort.desc,
        caseSensitive: caseSensitive,
      );
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByLastUpdated() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(3);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      sortByLastUpdatedDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(3, sort: Sort.desc);
    });
  }
}

extension CachedDashboardDataQuerySortThenBy
    on QueryBuilder<CachedDashboardData, CachedDashboardData, QSortThenBy> {
  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenById() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(0);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(0, sort: Sort.desc);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByKey({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(1, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByKeyDesc({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(1, sort: Sort.desc, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByJson({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(2, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByJsonDesc({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(2, sort: Sort.desc, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByLastUpdated() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(3);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterSortBy>
      thenByLastUpdatedDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(3, sort: Sort.desc);
    });
  }
}

extension CachedDashboardDataQueryWhereDistinct
    on QueryBuilder<CachedDashboardData, CachedDashboardData, QDistinct> {
  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterDistinct>
      distinctByKey({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(1, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterDistinct>
      distinctByJson({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(2, caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedDashboardData, CachedDashboardData, QAfterDistinct>
      distinctByLastUpdated() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(3);
    });
  }
}

extension CachedDashboardDataQueryProperty1
    on QueryBuilder<CachedDashboardData, CachedDashboardData, QProperty> {
  QueryBuilder<CachedDashboardData, int, QAfterProperty> idProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(0);
    });
  }

  QueryBuilder<CachedDashboardData, String?, QAfterProperty> keyProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(1);
    });
  }

  QueryBuilder<CachedDashboardData, String?, QAfterProperty> jsonProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(2);
    });
  }

  QueryBuilder<CachedDashboardData, DateTime?, QAfterProperty>
      lastUpdatedProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(3);
    });
  }
}

extension CachedDashboardDataQueryProperty2<R>
    on QueryBuilder<CachedDashboardData, R, QAfterProperty> {
  QueryBuilder<CachedDashboardData, (R, int), QAfterProperty> idProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(0);
    });
  }

  QueryBuilder<CachedDashboardData, (R, String?), QAfterProperty>
      keyProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(1);
    });
  }

  QueryBuilder<CachedDashboardData, (R, String?), QAfterProperty>
      jsonProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(2);
    });
  }

  QueryBuilder<CachedDashboardData, (R, DateTime?), QAfterProperty>
      lastUpdatedProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(3);
    });
  }
}

extension CachedDashboardDataQueryProperty3<R1, R2>
    on QueryBuilder<CachedDashboardData, (R1, R2), QAfterProperty> {
  QueryBuilder<CachedDashboardData, (R1, R2, int), QOperations> idProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(0);
    });
  }

  QueryBuilder<CachedDashboardData, (R1, R2, String?), QOperations>
      keyProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(1);
    });
  }

  QueryBuilder<CachedDashboardData, (R1, R2, String?), QOperations>
      jsonProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(2);
    });
  }

  QueryBuilder<CachedDashboardData, (R1, R2, DateTime?), QOperations>
      lastUpdatedProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addProperty(3);
    });
  }
}
